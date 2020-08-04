import * as core from '@actions/core'
import * as github from '@actions/github'
import * as Webhooks from '@octokit/webhooks'
import * as exec from '@actions/exec'

async function run(): Promise<void> {
  try {
    const packages = await parse_title()
    core.setOutput('package', packages.join(', '))

    const build = core.getInput('build') == 'true'
    for (var index in packages) {
      core.startGroup(`OfBuild: build ${packages[index]}`)
      if (build) {
        await exec.exec('nix-build', ['.', '-A', packages[index]])
      } else {
        core.warning(`would run 'nix-build . -A ${packages[index]}'`)
      }
      core.endGroup()
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

async function parse_title(): Promise<Array<string>> {
  const context = github.context.payload
  if (context.hasOwnProperty('pull_request')) {
    const title = String(context.pull_request!.title)
    core.debug(`title: ${context.pull_request!.title}`)

    var split = title.split(':', 2)
    split = split[0].split(',')
    core.debug(`packages: ${split.join(' + ')}`)
    return split
  } else {
    //core.info(`object: ${JSON.stringify(github)}`);
    core.warning(`not a pull request`)
    return []
  }

  return ['string']
}

run()

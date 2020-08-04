import * as core from '@actions/core'
//const github = require('@actions/github');
import * as github from '@actions/github'
import * as Webhooks from '@octokit/webhooks'
import {wait} from './wait'

async function run(): Promise<void> {
  try {
    /*const ms: string = core.getInput('milliseconds')
    core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    core.info(github.event);

    core.setOutput('time', new Date().toTimeString())*/

    if (github.context.eventName === 'push') {
      const pushPayload = github.context.payload; // as Webhooks.WebhookPayloadPush;
      core.info(`The head commit is: ${pushPayload}`);
    } else {
      core.info(`foobar: ${github.context.payload}`);
    };
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

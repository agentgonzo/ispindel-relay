import * as React from 'react'
import {FC, ReactElement} from 'react'

export const InstructionsPage: FC = (): ReactElement => {
  return <>
    <h1>iSpindel Relay</h1>
    <p>Welcome to the iSpindel Relay. This acts as a dashboard and relay for your iSpindel. It will show you the
      latest data from your iSpindel, and also forward the data on to multiple different services</p>

    <h2>Why does it exist</h2>
    <p>The iSpindel can be configured to send its fermentation data to a variety of different sources. However,
      it only allows you to send it to one service. It can be preferable to send to multiple sources</p>

    <h2>How do I configure my iSpindel?</h2>
    <p>Follow the official <a target="_blank" href="https://www.ispindel.de/docs/README_en.html#configuration">instructions</a>.
      Use the following configuration parameters:</p>
    <ul>
      <li>Service Type: <code>HTTP</code></li>
      <li>Token: <code>TODO: HARDCODED</code></li>
      <li>Server Address: <code>{window.location.protocol}//{window.location.hostname}</code></li>
      <li>Server Port: <code>{window.location.port}</code></li>
      <li>Server URL: <code>/api/data</code></li>
    </ul>

    <h2>How do I configure the services</h2>
    <p>Services are set up to use the same parameters as the official iSpindel configuration data.
      Click on the Services tab in the navigation bar at the top. From there, it should just be a
      simple case of creating as many services as you want, then configuring the same parameters as you would
      on your iSpindel
    </p>

    <h2>It doesn't work, or my services isn't listed</h2>
    <p>This is still a work in progress. Create an issue on my <a target="_blank" href="https://github.com/agentgonzo/ispindel-relay/issues">GitHub page</a></p>

    <h2>Can I see a graph of previous data</h2>
    <p>No - there are a bunch of services that do graphing. This is a simple relay. But I'm happy to accept Pull Requests if you want to do the work!</p>
  </>
}

import * as React from 'react'
import {FC, ReactElement} from 'react'
import {Link} from 'react-router-dom'

export const NoData: FC = (): ReactElement => (
  <>
    <h2>The relay has not received any data yet</h2>
    <p>This page will begin showing data when it is received from the iSpindel</p>
    <p>Please refer to the <Link to={"instructions"}>instructions</Link> to set up your iSpindel.</p>
  </>
)



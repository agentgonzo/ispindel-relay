import * as React from "react";
import {CurrentData} from '../components/CurrentData'
import {NoData} from '../components/NoData'
import {useData} from '../api'

function DataPage() {
  const {data} = useData()

  const valid = data && Object.keys(data).length
  return (
    <header className="App-header">
      {!valid
        ? <NoData/>
        : <CurrentData
          gravity={data.gravity}
          temperature={data.temperature}
          battery={data.battery}
          tilt={data.tilt}
          lastUpdate={data.lastUpdate}
          period={data.period}
        />}
    </header>
  );
}

export default DataPage

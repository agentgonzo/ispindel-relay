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
          originalGravity={data.gravity}
          temperature={data.temperature}
          temp_units={data.temp_units}
          battery={data.battery}
          angle={data.angle}
          lastUpdate={data.lastUpdate}
          period={data.period}
        />}
    </header>
  );
}

export default DataPage

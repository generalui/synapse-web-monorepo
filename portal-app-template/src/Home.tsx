import * as React from 'react'
import { Header } from './Header'
import { ExploreButtons } from './ExploreButtons'
import { SynapseComponents } from 'synapse-react-client'
import { Link, withRouter } from 'react-router-dom'
import { BarLoader } from 'react-spinners'
import routesConfig from './example-configuration/routesConfig'
import { NestedRoute, Route } from './types/portal-config'
import { getRouteFromParams, generateSynapseObject } from './RouteResolver'

type HomeState = {
  activeSynRoute: Route []
  activeSynObjectIndex: number
}

type HomeProps = {
  location: any
  history: any
  match: any
}

class Home extends React.Component<HomeProps, HomeState> {

  constructor(props: any) {
    super(props)
  }

  render () {
    const { location } = this.props
    const pathname = location.pathname
    const { synapseObject  } = getRouteFromParams(pathname)
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              {
                synapseObject!.map(
                  (el) => {
                    return (
                      <div key={el.title} className="newContainer">
                        <h2 className="title"> {el.title} </h2>
                        {
                          generateSynapseObject(el)
                        }
                        {el.link && <Link to={el.link} className="viewAll center-content"> View All </Link>}
                      </div>
                    )
                  }
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Home)

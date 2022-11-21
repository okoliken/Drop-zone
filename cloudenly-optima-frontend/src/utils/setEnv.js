
export default (nodeProcess) => {
  
    switch (nodeProcess.NODE_ENV) {
      case 'production':
        return {
          quantumServiceURL: nodeProcess.VUE_APP_QUANTUM_SERVICE_URL,
          optimaURL: nodeProcess.VUE_APP_OPTIMA_URL,
          humanarURL: nodeProcess.VUE_APP_HUMANAR_URL,
          cloudenlyURL : nodeProcess.VUE_APP_CLOUDENLY_WEBSITE_URL
        }


        case 'production_staging':
          return {
            quantumServiceURL: nodeProcess.VUE_APP_QUANTUM_SERVICE_URL,
            optimaURL: nodeProcess.VUE_APP_OPTIMA_URL,
            humanarURL: nodeProcess.VUE_APP_HUMANAR_URL,
            cloudenlyURL : nodeProcess.VUE_APP_CLOUDENLY_WEBSITE_URL
          }
  

  
      case 'development':
        return {
          quantumServiceURL: nodeProcess.VUE_APP_QUANTUM_DEV_SERVICE_URL,
          optimaURL: nodeProcess.VUE_APP_OPTIMA_DEV_URL,
          humanarURL: nodeProcess.VUE_APP_HUMANAR_DEV_URL,
          cloudenlyURL : nodeProcess.VUE_APP_CLOUDENLY_WEBSITE_DEV_URL

        }
  
      case 'staging':
        return {
          quantumServiceURL: nodeProcess.VUE_APP_QUANTUM_STAGING_SERVICE_URL,
          optimaURL: nodeProcess.VUE_APP_OPTIMA_STAGING_URL,
          humanarURL: nodeProcess.VUE_APP_HUMANAR_STAGING_URL,
          cloudenlyURL : nodeProcess.VUE_APP_CLOUDENLY_WEBSITE_STAGING_URL

        }
  
      case 'test':
        return {
          quantumServiceURL: nodeProcess.VUE_APP_QUANTUM_TEST_SERVICE_URL,
          optimaURL: nodeProcess.VUE_APP_OPTIMA_TEST_URL,
          humanarURL: nodeProcess.VUE_APP_HUMANAR_TEST_URL,
          cloudenlyURL : nodeProcess.VUE_APP_CLOUDENLY_WEBSITE_TEST_URL

        }
  
      default:
        throw new Error('Please specify development environment in .env file')
    }
  }
  
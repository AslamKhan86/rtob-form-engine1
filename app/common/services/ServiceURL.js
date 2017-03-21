/**
 * Created by Aslam Khan.
*/

function ServiceURL(BASE_URL) {
  switch (BASE_URL.name) {
    case 'apidev':
      return {
        postProducts : BASE_URL.apiEndpoint + '/origination/api/v2/product'

      }
    case 'test':
      return {
      }
      case 'apimock':
        return {
         }
    default:
      return {
    }
  }
}
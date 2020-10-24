import { useState } from 'react';

function useService(service) {
  const [, forceUpdate] = useState(0);
  return [service.state, (event) => {
    service.send(event);
    forceUpdate(x => x + 1)
  }]
}

export default useService;

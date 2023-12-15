import React, { useState } from 'react';
import Loader from 'components/Loader';

const PrefetchProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  return <>{loading ? children : <Loader />}</>;
};

export default PrefetchProvider;

import React from 'react';
import { Button, Result } from 'antd';
import { useRouter } from 'next/router';

const App: React.FC = () => { 
    const router = useRouter()
    return(
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '20px' }}>
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" onClick={() => router.push('/')}>Back Home</Button>}
    />
  </div>
)};

export default App;
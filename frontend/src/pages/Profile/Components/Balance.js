import { useAccount } from 'wagmi';
import Button from '../../../components/Button/Button';

const Balance = () => {
  const { address } = useAccount();
  return (
    <main
      style={{
        marginTop: 100,
        marginBottom: 100,
        width: '100%',
        height: '60vh',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: '#fff',
          width: '60%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 20,
        }}
      >
        <h2 style={{ marginTop: 10 }}>Your Account:</h2>
        <h4 style={{ color: '#00e64d', marginTop: 5 }}>{address}</h4>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 100,
            gap: 100,
          }}
        >
          <h3 style={{ display: 'flex', gap: 5 }}>
            Your Balance: <h4 style={{ color: '#00e64d' }}>1000$</h4>
          </h3>
          <h3 style={{ display: 'flex', gap: 5 }}>
            On Hold Balance: <h4 style={{ color: '#e60000' }}>10$</h4>
          </h3>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 100,
            marginBottom: 100,
            gap: 100,
          }}
        >
          <Button>Deposite</Button>

          <Button>withdraw</Button>
        </div>
      </div>
    </main>
  );
};
export default Balance;

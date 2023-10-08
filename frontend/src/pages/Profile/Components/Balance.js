import { useAccount } from 'wagmi';
import Button from '../../../components/Button/Button';
import { useContractRead, useContractWrite, usePrepareContractWrite, parseGwei } from 'wagmi';
import Fairlance from '../../../contract-artifacts/Fairlance.json';
import { ethers } from 'ethers';

const Balance = () => {
  const { address } = useAccount();

  const { data: availableBalance } = useContractRead({
    address: '0xA0345116b3b0bdCE341A4176402Dc670c8b638A4',
    functionName: 'balances',
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: 'balances',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    args: [address],
  });

  const { data: onHoldBalance } = useContractRead({
    address: '0xA0345116b3b0bdCE341A4176402Dc670c8b638A4',
    functionName: 'onholdBalances',
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: 'balances',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    args: [address],
  });

  const { config } = usePrepareContractWrite({
    address: '0xA0345116b3b0bdCE341A4176402Dc670c8b638A4',
    abi: [
      {
        inputs: [],
        name: 'deposit',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
    ],
    functionName: 'deposit',
    // value: ethers.utils.parseEther('0.1'),

    onSuccess(data) {
      console.log('Success', data);
    },
  });
  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    value: ethers.utils.parseEther('0.001'),
  });

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
            Your Balance: <h4 style={{ color: '#00e64d' }}>{availableBalance || 0}$</h4>
          </h3>
          <h3 style={{ display: 'flex', gap: 5 }}>
            On Hold Balance: <h4 style={{ color: '#e60000' }}>{onHoldBalance || 0}$</h4>
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
          <Button
            disabled={!write}
            onClick={() => write?.({ overrides: { value: ethers.utils.parseEther('0.001') } })}
          >
            Deposite
          </Button>

          <Button>withdraw</Button>
        </div>
      </div>
    </main>
  );
};
export default Balance;

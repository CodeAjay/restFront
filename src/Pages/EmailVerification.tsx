import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface ErrorResponse {
  message: string;
}

const EmailVerification: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    const [verificationResult, setVerificationResult] = useState<string | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const verifyEmail = async () => {
          try {
            if (!token) return; // If token is empty, don't make the request
            const response = await axios.get(`http://localhost:3000/verify/${token}`);
            if (response.status === 200) {
              setVerificationResult(response.data.message);
            } else if (response.status === 409) {
              setVerificationResult('Email is already verified.');
            } else if (response.status === 401) {
              setVerificationResult('Invalid or expired token.');
            } else {
              setVerificationResult(response.data.message);
            }
          } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error) && error.response) {
              const errorResponse = error.response.data as ErrorResponse;
              setError(errorResponse.message);
            } else {
              setError('An error occurred while verifying email.');
            }
          }
        };
      
        verifyEmail(); // Call verifyEmail on component mount
      }, [token]); // Add token as a dependency here

  return (
    <div>
      {verificationResult && <p>{verificationResult}</p>}
      {!verificationResult && <p>{error}</p>}
    </div>
  );
};

export default EmailVerification;

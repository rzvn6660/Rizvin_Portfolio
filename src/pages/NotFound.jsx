import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page-padding" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '16px' }} className="text-mono">404</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
          This path doesn't exist in the system.
        </p>
        <Link to="/" className="btn btn-primary">Return Home</Link>
      </div>
    </div>
  );
}

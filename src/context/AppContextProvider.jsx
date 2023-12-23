// AppContextProvider.js
import React from 'react';
import { AuthProvider } from './AuthContext';
import { BarangProvider } from './BarangContext';
import { PerlengkapanProvider } from './PerlengkapanContext';

import { combineComponents } from './CombineComponents';

const providers = [
    AuthProvider,
    BarangProvider,
    PerlengkapanProvider
];

export const AppContextProvider = combineComponents(...providers);

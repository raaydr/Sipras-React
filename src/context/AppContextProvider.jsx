// AppContextProvider.js
import React from 'react';
import { AuthProvider } from './AuthContext';
import { BarangProvider } from './BarangContext';

import { combineComponents } from './CombineComponents';

const providers = [
    AuthProvider,
    BarangProvider
];

export const AppContextProvider = combineComponents(...providers);

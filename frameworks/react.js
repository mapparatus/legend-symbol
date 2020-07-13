import legendSymbol from '../src/';
import {createElement, useState, useEffect} from 'react';
import reactish from './reactish';

export default reactish(legendSymbol, createElement, {useEffect, useState});

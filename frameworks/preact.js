import legendSymbol from '../src/';
import {h} from 'preact';
import {useState, useEffect} from 'preact/hooks';
import reactish from './reactish';

export default reactish(legendSymbol, h, {useEffect, useState});

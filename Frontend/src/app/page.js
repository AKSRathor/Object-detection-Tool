"use client"
import React, { useRef, useState, useEffect, useContext } from 'react'
import styles from './page.module.css'

import HomeOn from '@/Components/HomeOn';
import SearchState from '@/Context/SearchState';
import SearchContext from '@/Context/SearchContext';



export default function Home() {
  // const context = useContext(SearchContext)
  // const {modalOpen, setModalOpen} = context

  return (
    <SearchState>
      <main className={styles.main}>
        
        <HomeOn />
      </main>
    </SearchState>
  )
}

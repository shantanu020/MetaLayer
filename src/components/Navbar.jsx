import React from 'react';

import{ use, useRef } from 'react';
import { TiLocationArrow } from 'react-icons/ti';
import Button from './Button';
import { useState, useEffect } from 'react';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';
const navItems=['Nexus','Vault','Prologue','About','Contact'];
const Navbar = () => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setisIndicatorActive] = useState(false);
    const [lastScrollY, setlastScrollY] = useState(0)
    const [isNavVisible, setIsNavVisible] = useState(true);
    const navContainerRef = useRef();
    const audioElementRef = useRef(null);
    const { y: currentScrollY } = useWindowScroll();   
    useEffect(()=>{
        if(currentScrollY===0){
            setIsNavVisible(true);
            navContainerRef.current.classList.remove('floating-nav');
        }else if(currentScrollY>lastScrollY){
            setIsNavVisible(false);
            navContainerRef.current.classList.add('floating-nav');
        }else if(currentScrollY<lastScrollY){
            setIsNavVisible(true);
            navContainerRef.current.classList.add('floating-nav');
        }
        setlastScrollY(currentScrollY);
    },[currentScrollY,lastScrollY]);

    useEffect(()=>{
        gsap.to(navContainerRef.current,{
            y:isNavVisible?0:-100,
            opacity:isNavVisible?1:0,
            duration:0.2,
        })
    },[isNavVisible]);

    const toggleAudioIndicator =()=>{
        setIsAudioPlaying((prev)=>!prev);
        setisIndicatorActive((prev)=>!prev);
    }
    useEffect(()=>{
        if(isAudioPlaying){
            audioElementRef.current.play();
        }else{
            audioElementRef.current.pause();
        }
    },[isAudioPlaying])
  return (
    <div
      ref={navContainerRef}
      className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all 
      duration-700 sm:inset-x-6'>
      <header className='absolute top-1/2 -translate-y-1/2 w-full'>
        <nav className='flex size-full items-center justify-between p-4'>
          <div className='flex items-center gap-7'>
            <img src="/img/logo.png" alt="logo" 
            className='w-10'/>
            <Button
              id='product-button'
              title='Products'
              rightIcon={<TiLocationArrow />}
              containerClass='bg-blue-50 md:flex hidden items-center justify-center gap-1'
            />
          </div>
          <div className='flex h-full items-center'>
            <div className='hidden md:block'>
                {navItems.map((item)=>(
                    <a key={item} href={`#${item.toLowerCase()}`} className='relative ms-10 font-general text-xs uppercase text-blue-50 after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100 dark:after:bg-white cursor-pointer'>
                        {item}
                    </a>
                ))}
            </div>
            <button className='ml-10 flex items-center space-x-0.5'
            onClick={toggleAudioIndicator}>
                <audio ref={audioElementRef} className='hidden' src="/audio/loop.mp3" loop/>
                    {[1,2,3,4].map((bar)=>(
                        <div key={bar} className={`indicator-line ${isIndicatorActive?'active':''}`} style={{animationDelay: `${bar * 0.1}s`}}/>

                    ))}
            </button>

          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;

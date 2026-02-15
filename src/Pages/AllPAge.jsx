import React from 'react';
import HeroSlider from './HeroSlider';
import About from './About';
import PdfViewer from './Book/PdfViewer';
import Teachers from './Teacher/Teachers';

const AllPAge = () => {
    return (
        <div>
            <HeroSlider></HeroSlider>
            <About></About>
            <PdfViewer></PdfViewer>
            <Teachers></Teachers>
        </div>
    );
};

export default AllPAge;
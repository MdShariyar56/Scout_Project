import React from 'react';
import HeroSlider from './HeroSlider';
import About from './About';
import PdfViewer from './Book/PdfViewer';
import Teachers from './Teacher/TeachersList';
import Student from './Student/Student';
import EventsList from './EventsList/EventsList';

const AllPAge = () => {
    return (
        <div>
            <HeroSlider></HeroSlider>
            <About></About>
            <PdfViewer></PdfViewer>
            <EventsList></EventsList>
            <Teachers></Teachers>
            <Student></Student>
        </div>
    );
};

export default AllPAge;
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Training } from './components/Training';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#2C221E] flex flex-col font-sans selection:bg-[#58111A] selection:text-[#FFFDF9]">
      {/* Sticky Header Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero />
        <About />
        <Skills />
        <Training />
        <Projects />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

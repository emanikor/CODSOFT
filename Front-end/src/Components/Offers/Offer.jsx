import React from 'react'; 
import './Offer.css'
import frameJob from '../assets/frameJob.png';
import Groups from '../assets/Groups.png';

function Offer() { // Capitalize component name
  return (
    <div>
      <section id="offer">
        <div className="offer-container">
          <div className="offerImage">
            <img
              src={frameJob}
              alt='Frame Job'
              className='offer-section'
            />
          </div>

          <div className="offer-content">
            <p className="offer-header2">What we offer:</p>
            <p className="offer-p">Solutions that will take your recruitment 
to the next level!</p>
          <p>We build effective strategies that will help you reach 
employers worldwide.</p>
            <div className='offer-image'>
              {/* You can include your form component or form elements here */}
              <img
              src={Groups}
              alt='offer Job'
              className='offer-section'
            />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Offer;

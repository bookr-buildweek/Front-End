import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Programming from '../../assets/binary.jpg';
import Language from '../../assets/Language_Arts_Icon.png';
import Science from '../../assets/Science_Icon.png';
import History from '../../assets/Geo_Icon.png';
import Arts from '../../assets/Fine_Arts_Icon.png';
import PhysEd from '../../assets/Phys_Ed_Icon.png';

const FilterWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const FilterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding: 20px;
`

// const Box = styled.div`
//   display: 'flex';
//   align-items: 'center'; 
//   border: '1px solid rgba(191, 175, 134, 0.3)'; 
//   padding: '10px'; 
//   width: '300px'; 
//   margin-bottom: '10px'; 
//   background: '#FFF8E6';
// `

const Div = styled.div`
    @media (max-width: 768px) {
        flex-direction: column;

    }
`

function Filter() {
    return (
        <FilterWrap style={{display: 'flex', justifyContent: 'center'}}>
            <FilterBox >
            <h2 style={{color: '#BF9018', fontWeight: '700'}}>Filter books by category</h2>
                
                <Div style={{display: 'flex'}}>
                    <div style={{display: 'flex', flexDirection: 'column', paddingRight: '20px'}}>
                        <Link to="/books/Programming">
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(191, 175, 134, 0.3)', padding: '10px',
                                        width: '300px', marginBottom: '10px', background: '#FFF8E6'}}>
                            <img src={Programming} alt="binary" />
                            <p style={{padding: '0 10px 0 10px', fontSize: '20px', color: '#0D5814', fontWeight: '700'}}>Programming</p>
                        </div>
                        </Link>
                        <Link to="books/Language_Arts">
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(191, 175, 134, 0.3)', padding: '10px',
                                        width: '300px', marginBottom: '10px', background: '#FFF8E6'}}>
                            <img src={Language} alt="Language arts icon" />
                            <p style={{padding: '10px', fontSize: '20px', color: '#0D5814', fontWeight: '700'}}>Language Arts</p>
                        </div>
                        </Link>
                        <Link to="books/Science">
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(191, 175, 134, 0.3)', padding: '10px',
                                        width: '300px', marginBottom: '10px', background: '#FFF8E6'}}>
                            <img src={Science} alt="Science" />
                            <p style={{padding: '10px', fontSize: '20px', color: '#0D5814', fontWeight: '700'}}>Science</p>
                        </div>
                        </Link>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <Link to="books/History">
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(191, 175, 134, 0.3)', padding: '10px',
                                        width: '300px', marginBottom: '10px', background: '#FFF8E6'}}>
                            <img src={History} alt="History/Geography icon"/>
                            <p style={{padding: '10px', fontSize: '20px', color: '#0D5814', fontWeight: '700'}}>History/Geography</p>
                        </div>
                        </Link>
                        <Link to='books/Fine_Arts'>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(191, 175, 134, 0.3)', padding: '10px',
                                        width: '300px', marginBottom: '10px', background: '#FFF8E6'}}>
                            <img src={Arts} alt="Fine arts icon"/>
                            <p style={{padding: '10px', fontSize: '20px', color: '#0D5814', fontWeight: '700'}}>Fine Arts</p>
                        </div>
                        </Link>
                        <Link to='books/Physical_Education'>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(191, 175, 134, 0.3)', padding: '10px',
                                        width: '300px', marginBottom: '10px', background: '#FFF8E6'}}>
                            <img src={PhysEd} alt="Physical education icon" />
                            <p style={{padding: '10px', fontSize: '20px', color: '#0D5814', fontWeight: '700'}}>Physical Education</p>
                        </div>
                        </Link>
                    </div>
                </Div>
            </FilterBox>
        </FilterWrap>
    )
}

export default Filter;


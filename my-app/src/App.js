import {useState, useRef} from "react";
import './App.css';
import makeAGame from './cardbingo';
// import card from "./Cards/1C.png"
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas'


function App() {
// const [refArr,setRefArr]= useState([])
  const printRef = useRef([]);

  const handleDownloadPdf = async () => {
    const pdf = new jsPDF();
    console.log(printRef.current)
for(let i=0;i < printRef.current.length ;i++){
 const element = printRef.current[i];
    
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');
    
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight =
      (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    pdf.addPage();
   }
   pdf.save('cards.pdf');
   
  };

let cardsToShow =[]
const [numCards, setNumCards]=useState(0)
const [cardsonPage, setCardsonPage] = useState([])
function handleNumChange(e){
  const value = e.target.value;
  setNumCards(value)
}

function submitCardNums(){
cardsToShow = makeAGame(numCards);
 setCardsonPage([...cardsToShow]);

console.log(cardsonPage)
}
function downloadPDF(){

  handleDownloadPdf();
}

  return (
    <>
    <input type="number" onChange={(e)=>handleNumChange(e)}></input>
    <button disabled={numCards < 1} onClick={()=>{submitCardNums()}}>CLICK TO START</button>
  {cardsonPage.length >0 &&
  <button onClick={downloadPDF}>Download PDF</button>
  }    

{cardsonPage?.map((playerCard, index)=>(
<div className="page" ref={(element) => {
              printRef.current[index] = element;
            }}>
         
        {playerCard.map((card)=>(
          <div class="pageCards">   <div className="cardHead">Metal Detector Bingo</div>
            <div className="cardGrid">
             
                <div className="heartCol">
              {card.H.array.map((cardNum)=>(
                 <div className="singleCard" style = {{backgroundImage: `url(${`./Cards/${cardNum}H.png`})`}}></div>
              ))}
              </div>

              <div className="clubCol">
            {card.C.array.map((cardNum)=>(
                 <div className="singleCard" style = {{backgroundImage: `url(${`./Cards/${cardNum}C.png`})`}}></div>
              ))}
              </div>

                <div className="diamondCol">
              {card.D.array.map((cardNum)=>(
                 <div className="singleCard" style = {{backgroundImage: `url(${`./Cards/${cardNum}D.png`})`}}></div>
              ))}
              </div>

              <div className="clubCol">
              {card.S.array.map((cardNum)=>(
                 <div className="singleCard" style = {{backgroundImage: `url(${`./Cards/${cardNum}S.png`})`}}></div>
              ))}
              </div>

            </div></div>
          )
          )}
      </div>
))}
      

    </>
  );
}

export default App;

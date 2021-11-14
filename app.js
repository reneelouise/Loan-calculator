//UI variables
const loanForm = document.querySelector('.loan-form')
const loanInput = document.querySelector('.loan-amount');
const interestInput = document.querySelector('.interest-amount');
const yearsInput = document.querySelector('.repayment-years');
const calculateBtn= document.querySelector('.calculate-btn');

const resultForm = document.querySelector('.results-form')
const monthlyPaymentResult = document.querySelector('.monthly-payment')
const totalPaymentResult = document.querySelector('.total-payment')
const totalInterestResult = document.querySelector('.total-interest')





//load event listeners

loadEventListeners()

//load event listener - calculate button

function loadEventListeners(){
    //calculate button click event
    calculateBtn.addEventListener('click', displayResult);
}

//display results

function displayResult(e){
   

    //calculate results and set read only input values of results

    
    const principal = parseFloat(loanInput.value);
    const rateOfInterest= parseFloat(interestInput.value) / 100 / 12;
    const yearsToMonths = parseFloat(yearsInput.value)*12

    //calculate the monthly payment result and display it
    const x = Math.pow(1 + rateOfInterest, yearsToMonths);
    const monthlyPayments = (principal*x*rateOfInterest)/(x-1);
    
    if(isFinite(monthlyPayments)){
        monthlyPaymentResult.value = `Total monthly payments: £${monthlyPayments.toFixed(2)}`;
        monthlyPaymentResult.setAttribute('readonly','');
        totalPaymentResult.value = `Total repayment: £${(monthlyPayments*yearsToMonths).toFixed(2)}`;
        totalPaymentResult.setAttribute('readonly', '');
        totalInterestResult.value = `Total interest paid: £${((monthlyPayments*yearsToMonths)-principal).toFixed(2)}`;
        totalInterestResult.setAttribute('readonly','');

        let results = document.querySelector('.results-display')
        results.style.display ='block';


    }else{
        
    
        showError('Please insert numbers for all fields to generate calculations');
      

    }
    

   e.preventDefault()
}



function showError(error){
    //create a div element
    const errorCard = document.createElement('div');

    //give error card a class name

    errorCard.className = 'alert';

    //select the heading so that we can insert the error card after/before later
    const card = document.querySelector('.main-card')
    const heading = document.querySelector('.heading')

    //place some text inside the error card
    errorCard.appendChild(document.createTextNode(error));

    //add some styling to the error card.
    errorCard.style.backgroundColor ='red'
    errorCard.style.color ='black'
    errorCard.style.borderRadius ='10px'
    errorCard.style.marginTop ='10px'
    errorCard.style.padding ='10px'
    errorCard.style.border ='solid grey'

    

    //insert this card before the loan calculator heading

    card.insertBefore(errorCard, heading)

    //clear error after 3s

    setTimeout(clearError, 3000);



}


//clear error

function clearError(){
    document.querySelector('.alert').remove()
  
}
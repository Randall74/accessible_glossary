const state = {
    neverOpened: true,
    currentLetter: 'A'
}
const alphabet = ['A', 'B', 'C', 'D', 'E', 'G', 'H', 'I', 'L', 'P', 'S', 'T', 'V', 'W'];
const openglossary = document.querySelector('.openglossary');
const glossaryHeading = document.querySelector('#glossaryHeading');
const glossarySectionElement = document.querySelector('.glossarySection');
const switchSelectedLetters = (target) => {
    const selector = "selectedLetter";
    const currentSelectedLetter = document.querySelector(`.${selector}`);
    const currentAria = currentSelectedLetter.getAttribute("aria-label");
    const targetAria = target.getAttribute("aria-label");
    const selectionText = "Current selected, ";
    //use [...selectionText] because we want number of characters, not code units.
    currentSelectedLetter.setAttribute("aria-label", currentAria.substring([...selectionText].length))
    currentSelectedLetter.classList.remove(selector);
    target.setAttribute("aria-label", selectionText + targetAria);
    target.classList.add(selector);
}
const switchShowingLetterContent = (letter) => {
    const currentlyShowingLetter = document.querySelector('.currentLetter_content');
    const currentHeader = currentlyShowingLetter.firstElementChild;
    currentHeader.setAttribute("aria-hidden", "true");
    currentlyShowingLetter.classList.remove('currentLetter_content');
    state.currentLetter = letter;
    const letterToShow = document.getElementById(`letter${letter}_content`);
    letterToShow.classList.add('currentLetter_content');
}
const goToNextLetter = () => {
    const {
        currentLetter
    } = state;
    const placeInAlphabet = alphabet.indexOf(currentLetter);
    const nextLetterIndex = (placeInAlphabet === (alphabet.length - 1)) ? 0 : placeInAlphabet + 1;
    const nextLetter = alphabet[nextLetterIndex];
    const nextLetterButtonSelector = `.letter[aria-label="Glossary letter ${nextLetter}"]`;
    const nextLetterButton = document.querySelector(nextLetterButtonSelector);
    setTimeout(() => {
        nextLetterButton.focus();
    }, 16);


}
const focusLetterContent = (letter) => {
    console.log("focusLetterContent")
    const letterToFocus = document.getElementById(`letter${letter}_heading`);
    console.log(letterToFocus);
    letterToFocus.setAttribute("aria-hidden", "false");
    setTimeout(() => {
        letterToFocus.focus();
    }, 16);

}
const showGlossaryTerm = (e) => {
    const target = e.target;
    const letter = target.textContent;
    switchSelectedLetters(target);
    switchShowingLetterContent(letter);
    focusLetterContent(letter);
}

const openGlossarySection = () => {
    if (state.neverOpened) {
        const closeglossary = document.querySelector('.close');
        closeglossary.onclick = closeGlossarySection;
        //attach onclick handlers to all glossary buttons
        const glossaryLetter = document.querySelectorAll('.letter');
        glossaryLetter.forEach((letter) => {
            letter.onclick = showGlossaryTerm;
        });
    }
    glossarySectionElement.classList.add('show');
    openglossary.classList.add("hide");
    setTimeout(() => {
        glossaryHeading.focus();
    }, 16);


};

const closeGlossarySection = () => {
    glossarySectionElement.classList.remove('show');
    openglossary.classList.remove("hide");
    setTimeout(() => {
        openglossary.focus();
    }, 16);
};

openglossary.onclick = openGlossarySection;
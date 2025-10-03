let boxes = document.querySelectorAll('.box');
let resetbtn = document.querySelector('.resetbtn');
let newgamebtn = document.querySelector('#new-btn');
let msgcontainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg')
let winnerFound = false;

let turnO = true;//playre x playre O

const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
const resetgame = () => {
    turnO = true;
    enbleboxes();
    msgcontainer.classList.add('hide');

}

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        console.log('box clicked');
        if (turnO) {
            box.innerText = 'O';
            turnO = false;
        }
        else {
            box.innerText = 'X';
            turnO = true;
        }
        box.disabled = true;

        checkwinner();
        checkdraw();

        
        
    });
});

const checkdraw = () => {
  let filledboxes = 0;

  // count filled boxes
  boxes.forEach((box) => {
    if (box.innerText !== "") {
      filledboxes++;
    }
  });

  // if all filled and no winner
  if (filledboxes === 9 && !winnerFound) {
    msg.innerText = "It's a Draw!";
    msgcontainer.classList.remove("hide");
    disableboxes();
  }
};
const disableboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enbleboxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = '';
    }
}
const showWinner = (winner) => {
    msg.innerText = `congrats! ${winner} is the winner`;
    msgcontainer.classList.remove('hide');
    disableboxes();
}

const checkwinner = () => {
    for (pattern of winpatterns) {
        let posval1 = boxes[pattern[0]].innerText;
        let posval2 = boxes[pattern[1]].innerText;
        let posval3 = boxes[pattern[2]].innerText;
        if (posval1 != '' && posval2 != '' && posval3 != '') {
            if (posval1 == posval2 && posval2 == posval3) {
                console.log("winner found", posval1);
                showWinner(posval1);
            };
        }
    }
};
newgamebtn.addEventListener('click', resetgame);
resetbtn.addEventListener('click', resetgame);
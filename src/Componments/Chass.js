import { useState, useEffect } from "react";
import "./Board.css";

const Chass = () => {
  const [start, setStart] = useState(false);
  const [lifeLine, setLifeLine] = useState(5);
  const [level, setlevel] = useState(1);
  const [AllData, setAllData] = useState([]);
  const [ChekValue, setChekValue] = useState([]);
  const [a, setA] = useState(3);
  const [b, setB] = useState(3);
  const [c, setC] = useState(9);
  let board = [];
  useEffect(() => {
    if (start) {
      randomValue();
    }
  }, [start, a]);

  const randomValue = () => {
    for (let i = 0; i < a; i++) {
      let value3 = Math.floor(Math.random() * c);
      document.getElementsByTagName("span")[value3].style.background = "yellow";
      console.log(value3, "value3");
      [value3].forEach(function (value) {
        if (AllData.indexOf(value) == -1) {
          AllData.push(value);
        }
      });
      console.log(AllData, "AllData");
      setTimeout(() => {
        document.getElementsByTagName("span")[value3].style.background =
          "white";
      }, 3000);
    }
  };

  const reStartButton = () => {
    let value = a * b;
    for (let i = 0; i < value; i++) {
      document.getElementsByTagName("span")[i].style.background = "white";
    }
  };

  const areEqual = (array1, array2) => {
    if (array1.length === array2.length) {
      return array1.every((element) => {
        if (array2.includes(element)) {
          return true;
        }
        return false;
      });
    }
    return false;
  };

  const getIndex = () => {
    let index = [];
    let data = [];
    const g = document.getElementById("chassboard");
    for (let i = 0, len = g.children.length; i < len; i++) {
      g.children[i].onclick = function () {
        index.push(i);
        data.push(board[index]);
        board.map((item, key) => {
          if (key == index) {
            ChekValue.push(index[0]);
            document.getElementsByTagName("span")[index].style.background =
              "yellow";
          }
        });
        if (AllData.length == ChekValue.length) {
          if (areEqual(AllData, ChekValue) == true) {
            setA(a + 1);
            setC(c + 3);
            setlevel(level + 1);
            alert("next level");
            reStartButton();
            setAllData([]);
            setChekValue([]);
          } else {
            setAllData([]);
            setChekValue([]);
            if (lifeLine <= 1) {
              window.location.reload();
            }
            setLifeLine(lifeLine - 1);
            alert("Out level");
            reStartButton();
            setStart(false);
          }
        }
      };
    }
  };

  for (var i = 0; i < a; i++) {
    for (var j = 0; j < b; j++) {
      board.push(
        <span id="boxes" onClick={() => getIndex()}>
          {/* {i}
          {j} */}
        </span>
      );
    }
  }
  return (
    <>
      <div className="Main" >
        <div className="row container">
          <div className="col-lg-1 col-md-1 col-sm-12 col-xs-12">
            <div className="title">Memory Power Game </div>
          </div>
          <div
            className="col-lg-10 col-md-10 col-sm-12 col-xs-12 centerdiv"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div >
              <div id="chassboard" >{board}</div>
              <div>
                <div className="button">
                  <div className="buttonOne">
                    <button
                      className="buttonOneIn"
                      onClick={() => {
                        getIndex();
                        setStart(true);
                      }}
                    >
                      start
                    </button>
                  </div>
                  <div className="buttonTwo">
                    <button
                      className="buttonTwoIn"
                      onClick={() => {
                        reStartButton();
                        setStart(false);
                      }}
                    >
                      Restart
                    </button>
                  </div>
                </div>
                <div className="life">
                  <div className="headerName">Lifelines</div>
                  <div className="lifeLineNum">{lifeLine}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-1 col-md-1 col-sm-12 col-xs-12">
            {" "}
            <div className="level">Level {level}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chass;

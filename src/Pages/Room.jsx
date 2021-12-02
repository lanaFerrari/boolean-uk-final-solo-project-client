export default function Room() {
  return (
    <main>
      <div className="padding-top-bottom">
        <p>Player 1:</p>
        <p>Player 2:</p>
      </div>

      <div id="game-table" className="align-center padding-top-bottom">
        <table>
          <tr>
            <td class="noPieceHere"></td>
            <td>
              <span class="red-piece" id="0"></span>
            </td>
            <td class="noPieceHere"></td>
            <td>
              <span class="red-piece" id="1"></span>
            </td>
            <td class="noPieceHere"></td>
          </tr>
          <tr>
            <td>
              <span class="red-piece" id="2"></span>
            </td>
            <td class="noPieceHere"></td>
            <td>
              <span id="pTag" class="red-piece" id="3"></span>
            </td>
            <td class="noPieceHere"></td>
            <td>
              <span class="red-piece" id="4"></span>
            </td>
          </tr>
          <tr>
            <td class="noPieceHere"></td>
            <td></td>
            <td class="noPieceHere"></td>
            <td></td>
            <td class="noPieceHere"></td>
          </tr>

          <tr>
            <td></td>
            <td class="noPieceHere"></td>
            <td></td>
            <td class="noPieceHere"></td>
            <td></td>
          </tr>
          <tr>
            <td class="noPieceHere"></td>
            <td>
              <span class="black-piece" id="5"></span>
            </td>
            <td class="noPieceHere"></td>
            <td>
              <span class="black-piece" id="6"></span>
            </td>
            <td class="noPieceHere"></td>
          </tr>
          <tr>
            <td>
              <span class="black-piece" id="7"></span>
            </td>
            <td class="noPieceHere"></td>
            <td>
              <span class="black-piece" id="8"></span>
            </td>
            <td class="noPieceHere"></td>
            <td>
              <span class="black-piece" id="9"></span>
            </td>
          </tr>
        </table>

        <div class="three-c-grid justify-center  padding-top-bottom">
          <div class="red-turn-text">Reds turn</div>
          <span id="divider">|</span>
          <div class="black-turn-text">Blacks turn</div>
        </div>
      </div>
    </main>
  );
}

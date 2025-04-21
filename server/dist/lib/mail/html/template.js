export const getHtmlMail = ({ firstName, txt, url, labelBtn, }) => `   <table style="margin-top: 50px">
      <tr>
        <td
          style="
            font-weight: 900;
            font-family: Comic Sans MS;
            font-size: 35px;
            padding-bottom: 25px;
          "
        >
          PERN__BOOK📔
        </td>
      </tr>
      <tr>
        <td
          style="
            font-weight: 900;
            font-family: Comic Sans MS;
            font-size: 20px;
            padding-bottom: 25px;
          "
        >
          Hi ${firstName}
        </td>
      </tr>
      <tr>
        <td
          style="
            font-weight: 900;
            font-family: Comic Sans MS;
            font-size: 20px;
            padding-bottom: 50px;
          "
        >
          CLick the button below to be redirected to our website and ${txt}
        </td>
      </tr>

      <tr>
        <td align="center">
          <a
            href="${url}"
            style="
              width: fit-content;
              padding: 17.5px 50px;
              border-radius: 15px;
              appearance: none;
              cursor: pointer;
              background: #111;
              text-decoration: none;
              color: whitesmoke;
              font-weight: 900;
              font-family: Comic Sans MS;
            "
          >
            <span style="font-size: 25px">${labelBtn}</span>
          </a>
        </td>
      </tr>
    </table>`;

import { ParseToken, ParseTokenType } from "./emitter";

const parse = (input: string): Array<ParseToken> => {
  const output = [];
  let currentString = "";
  for (var i = 0; i < input.length; i++) {
    const char = input[i];
    switch (char) {
      case "*":
        if (i + 1 < input.length && input[i + 1] === "*") {
          const retVal = parseSingleLineStyle(
            input,
            i,
            ParseTokenType.Bold,
            "*"
          );
          if (retVal) {
            output.push(retVal.token);
            i = retVal.index;
            break;
          }
        }
        currentString += char;
        break;
      default:
        currentString += char;
        break;
    }
  }
  if (currentString.length > 0) {
    output.push(currentString);
  }
  return output;
};

const parseSingleLineStyle = (
  input: string,
  i: number,
  type: ParseTokenType,
  char: string
): { token: ParseToken; index: number } | undefined => {
  i += 2;
  let styleString = "";
  while (input.length > i + 1 && (input[i] !== char || input[i + 1] !== char)) {
    console.log(input[i]);
    styleString += input[i];
    i++;
  }
  if (input[i] !== char || input[i + 1] !== char) {
    return;
  }
  i++;
  return { token: { type: type, value: styleString }, index: i };
};

export default parse;

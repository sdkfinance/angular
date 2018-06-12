import {Injectable} from '@angular/core';

@Injectable()
export class TransliterationService {

    constructor() {
    }

    static translit(data) {
        if (data) {
            let resultString = '';
            for (let i = 0; i < data.length; i++) {
                let char = data[i];

                switch (char.charCodeAt(0)) {
                    case 39:
                        resultString += '';
                        break;
                    case 1108:
                        resultString += 'ie';
                        break;
                    case 1028:
                        resultString += 'Ie';
                        break;
                    case 1031:
                        resultString += 'Yi';
                        break;
                    case 1110:
                        resultString += 'i';
                        break;
                    case 1111:
                        resultString += 'i';
                        break;
                    case 1130:
                        resultString += 'I';
                        break;
                    case 1040:
                        resultString += 'A';
                        break;
                    case 1041:
                        resultString += 'B';
                        break;
                    case 1042:
                        resultString += 'V';
                        break;
                    case 1043:
                        resultString += 'G';
                        break;
                    case 1044:
                        resultString += 'D';
                        break;
                    case 1045:
                        resultString += 'E';
                        break;
                    case 1025:
                        resultString += 'E';
                        break;
                    case 1046:
                        resultString += 'Zh';
                        break;
                    case 1047:
                        resultString += 'Z';
                        break;
                    case 1048:
                        resultString += 'I';
                        break;
                    case 1049:
                        resultString += 'Y';
                        break;
                    case 1050:
                        resultString += 'K';
                        break;
                    case 1051:
                        resultString += 'L';
                        break;
                    case 1052:
                        resultString += 'M';
                        break;
                    case 1053:
                        resultString += 'N';
                        break;
                    case 1054:
                        resultString += 'O';
                        break;
                    case 1055:
                        resultString += 'P';
                        break;
                    case 1056:
                        resultString += 'R';
                        break;
                    case 1057:
                        resultString += 'S';
                        break;
                    case 1058:
                        resultString += 'T';
                        break;
                    case 1059:
                        resultString += 'U';
                        break;
                    case 1060:
                        resultString += 'F';
                        break;
                    case 1061:
                        resultString += 'Kh';
                        break;
                    case 1062:
                        resultString += 'TS';
                        break;
                    case 1063:
                        resultString += 'Ch';
                        break;
                    case 1064:
                        resultString += 'Sh';
                        break;
                    case 1065:
                        resultString += 'Shch';
                        break;
                    case 1066:
                        resultString += 'Ia';
                        break;
                    case 1067:
                        resultString += 'Y';
                        break;
                    case 1068:
                        resultString += '';
                        break;
                    case 1069:
                        resultString += 'e';
                        break;
                    case 1070:
                        resultString += 'Iu';
                        break;
                    case 1071:
                        resultString += 'Ia';
                        break;
                    case 1072:
                        resultString += 'a';
                        break;
                    case 1073:
                        resultString += 'b';
                        break;
                    case 1074:
                        resultString += 'v';
                        break;
                    case 1075:
                        resultString += 'g';
                        break;
                    case 1076:
                        resultString += 'd';
                        break;
                    case 1077:
                        resultString += 'e';
                        break;
                    case 1105:
                        resultString += 'e';
                        break;
                    case 1078:
                        resultString += 'zh';
                        break;
                    case 1079:
                        resultString += 'z';
                        break;
                    case 1080:
                        resultString += 'i';
                        break;
                    case 1081:
                        resultString += 'i';
                        break;
                    case 1082:
                        resultString += 'k';
                        break;
                    case 1083:
                        resultString += 'l';
                        break;
                    case 1084:
                        resultString += 'm';
                        break;
                    case 1085:
                        resultString += 'n';
                        break;
                    case 1086:
                        resultString += 'o';
                        break;
                    case 1087:
                        resultString += 'p';
                        break;
                    case 1088:
                        resultString += 'r';
                        break;
                    case 1089:
                        resultString += 's';
                        break;
                    case 1090:
                        resultString += 't';
                        break;
                    case 1091:
                        resultString += 'u';
                        break;
                    case 1092:
                        resultString += 'f';
                        break;
                    case 1093:
                        resultString += 'kh';
                        break;
                    case 1094:
                        resultString += 'ts';
                        break;
                    case 1095:
                        resultString += 'ch';
                        break;
                    case 1096:
                        resultString += 'sh';
                        break;
                    case 1097:
                        resultString += 'shch';
                        break;
                    case 1098:
                        resultString += 'ie';
                        break;
                    case 1099:
                        resultString += 'y';
                        break;
                    case 1100:
                        resultString += '';
                        break;
                    case 1101:
                        resultString += 'e';
                        break;
                    case 1102:
                        resultString += 'iu';
                        break;
                    case 1103:
                        resultString += 'ia';
                        break;
                    default:
                        resultString += char;
                        break;
                }
            }

            return resultString;
        }
        return null;
    }

}

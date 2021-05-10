"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class ParserUtil {
    static ParseData(data, v) {
        return __awaiter(this, void 0, void 0, function* () {
            const res1 = yield ParserUtil.findFirstName(data, 0);
            console.log('result 1', res1);
            const res2 = yield ParserUtil.findLastName(data, res1.end);
            console.log('result 2', res2);
            const res3 = yield ParserUtil.findClientId(data, res2.end);
            console.log('result 3', res3);
            if (v === "2") {
                res1.firstName = res1.firstName.replace("0000", '');
                res2.lastName = res2.lastName.replace("000", '');
                let clientId = res3.clientId;
                clientId = clientId.substring(0, 3) + '-' + clientId.substr(-4);
                res3.clientId = clientId;
            }
            return {
                firstName: res1.firstName,
                lastName: res2.lastName,
                clientId: res3.clientId
            };
        });
    }
    ;
    static findFirstName(data, start) {
        // extract first name, check for 4 consecutive zeros then get last index
        let end = 0;
        let firstName = '';
        console.log('data --> ', data);
        console.log('data length', data.length);
        for (let i = 0; i < data.length; i++) {
            console.log('character ', i);
            console.log('substring', data.substr(i, 4));
            if (data.substr(i, 4) === '0000') {
                end = i + 4;
                firstName = data.substr(start, end);
                break;
            }
        }
        return { start, end, firstName };
    }
    static findLastName(data, start) {
        // get the starting index with 4 zeroess
        let end = 0;
        let lastName = '';
        for (let i = start; i < data.length; i++) {
            if (data.substr(i, 3) === '000') {
                end = i + 3;
                lastName = data.substr(start, end - start);
                break;
            }
        }
        return { start, end, lastName };
    }
    static findClientId(data, start = 0) {
        const clientId = data.substr(start, data.length - start);
        return { clientId };
    }
}
exports.default = ParserUtil;
//# sourceMappingURL=parserUtil.js.map
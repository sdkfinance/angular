export function parseNumberString(data): string {
    let result: string = '';
    let hasDot: boolean = false;
    let numberAfterDot: number = 0;
    let isFirst: boolean = true;
    for (let ch of data) {
        if (numberAfterDot < 3 && ch >= '0' && ch <= '9' || (ch === '.' && !hasDot)) {
            if (isFirst && ch === '.') {
                result += '0';
            }
            result += ch;
            isFirst = false;
            if (ch === '.') {
                hasDot = true;
            }
            if (hasDot) {
                numberAfterDot++;
            }
        }
    }
    return result;
}

export function checkPAN(digits: string): boolean {
    let sum: number = 0;
    let length: number = digits.length;
    for (let i = 0; i < length; i++) {

        // get digits in reverse order
        let digit: number = +digits[length - i - 1];

        // every 2nd number multiply with 2
        if (i % 2 === 1) {
            digit *= 2;
        }
        sum += digit > 9 ? digit - 9 : digit;
    }
    return sum % 10 === 0;
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

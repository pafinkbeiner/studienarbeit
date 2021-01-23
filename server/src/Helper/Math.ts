/**
 * Max Temp [0-100] -> [0-50]
 * @param x 
 */
export function tempMathFunc(x: number){
    return ( -(1/50)*(x-50)^2 + 50 );
}

/**
 * Max Speed [0-100] -> [0-50]
 * @param x 
 */
export function speedMathFunc(x: number){
    return ( -(1/50)*(x-50)^2 + 50 );
}
/**
 * Helper Utils
 * - environment variables available (procces.env.XXX)
 */

export function consoleGreet() {
  var greeting = process.env.CONSOLE_GREETING;
  if(greeting === 'disable' || greeting === 'disabled') return;
  console.log(`%c ${greeting} `, 'background: #222; color: #bada55');
}
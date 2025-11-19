export const capitialize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export function FormatMessageTime(date){
    return new Date(date).toLocaleTimeString("en-us", {hour: '2-digit', minute: '2-digit'});
}
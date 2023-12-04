
function useDebounce(func : CallableFunction , delay : number = 300) {
    let timer : any
   return function(...args : any){
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
   }
}

export default useDebounce
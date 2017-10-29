/*
이제 리듀서를 만들 차례입니다. 
복습을 하자면, 리듀서는 액션의 type에 따라 변화를 일으키는 함수입니다. 

그리고, 이 리듀서 파일에는 최초변화를 일으키기전, 지니고있어야 할 초기상태가 정의되어야 하죠.

리듀서 함수는 state 와 action 을 파라미터로 가지는 함수이며, 그 내부에서 switch 문을 통하여 action.type 에 따라 상태에 다른 변화를 일으키면 됩니다.
여기서 주의하실점은, 

        state 를 직접 수정하면 절대 안되고, 기존 state 값에 덮어쓴 새 상태객체를 만드는 방식으로 해야합니다.


지금까지 우리가 이전 프로젝트들 (투두리스트, 주소록) 에서 state 내부의 객체를 다뤘었던것 처럼요.


*/


import * as types from '../actions/ActionTypes'


/* 
    리듀서 함수를 정의합니다. 리듀서는 state 와 action 을 파라미터로 받습니다.
    state 가 undefined 일때 (스토어가 생성될때) state 의 기본값을 initialState 로 사용합니다.
    action.type 에 따라 다른 작업을 하고, 새 상태를 만들어서 반환합니다.
    이 때 주의 할 점은 state 를 직접 수정하면 안되고,
    기존 상태 값에 원하는 값을 덮어쓴 새로운 객체를 만들어서 반환해야합니다.
*/

/*
    서브 리듀서들을 하나로 합칩니다.
    combineReducers 를 실행하고 나면, 나중에 store의 형태가 파라미터로 전달한 객체의 모양대로 만들어집니다.
    지금의 경우:
    {
        numberData: {
            number: 0
        },
        colorData: {
            color: 'black'
        }
}   
    로 만들어집니다.
*/

const initialState = {
    counters: [
        {
            color: 'black',
            number: 0,
        }
    ]
}

function counter(state = initialState, action){
    const { counters } = state
    switch(action.type){
/*
컴포넌트의 state 안에있는 배열을 다룰때와 동일하게, 기존 배열에 직접 push() 혹은 pop() 을 하면 안돼고,
... (spread 문법)을 사용하거나, .slice() 함수를 사용하여 배열을 잘라 새로 생성을 해야 합니다.
state 에서 array 를 직접 수정하는게 아닌 새로 만들어서 교체하는 방법처럼 해야한다....
*/
        case types.CREATE:
            return {
                counters: [
                    ...counters,
                    {
                        color: action.color,
                        number: 0
                    }
                ]
            }
        case types.REMOVE:
            return {
                counters: counters.slice(0, counters.length - 1)
            }
        case types.INCREMENT:
            return {
                // state 에 pop 이나 push 로 데이터를 변경할 수 없으며, 객체를 새로 만들어 state 로 넣어주기위해 slice 를 사용하였다.
                // state 의 특정 index 하나만 수정하려해도 array의 원소들을 전부 다시 구성하여 state에 넣을 값을 만들어 주어야 하기 때문에 
                // 다음과 같은 코드가 나오게 되었다.
                counters: [
                    ...counters.slice(0, action.index),
                    {
                        ...counters[action.index],
                        number: counters[action.index].number + 1,
                    },
                    ...counters.slice(action.index + 1, counters.length)
                ]
            }

        case types.DECREMENT:
            return {
                counters: [
                    ...counters.slice(0, action.index),
                    {
                        ...counters[action.index],
                        number: counters[action.index].number - 1,
                    },
                    ...counters.slice(action.index + 1, counters.length)

                ]
            }
        case types.SET_COLOR:
            return {
                counters: [
                    ...counters.slice(0, action.index),
                    {
                        ...counters[action.index],
                        color: action.color,
                    },
                    ...counters.slice(action.index + 1, counters.length)

                ]
            }

        default:
            return state
    }
}

/*
const reducers = combineReducers({
  numberData: number,
  colorData: color,
});

export default reducers

*/

export default counter
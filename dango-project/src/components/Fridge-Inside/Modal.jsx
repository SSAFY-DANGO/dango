import React, {useState, useEffect} from 'react';
import { useRecoilValue } from 'recoil';
import { loginUserState } from '../../recoil/atoms/userState';

import {deleteGrocery} from '../../api/Api'
import 랜덤 from '../../assets/imgs/mark_question.png'
import 아보카도 from '../../assets/imgs/groceries/아보카도.png'
import 감자 from '../../assets/imgs/groceries/감자.png'
import 고추 from '../../assets/imgs/groceries/고추.png'
import 귤 from '../../assets/imgs/groceries/귤.png'
import 당근 from '../../assets/imgs/groceries/당근.png'
import 대파 from '../../assets/imgs/groceries/대파.png'
import 돼지고기 from '../../assets/imgs/groceries/돼지고기.png'
import 딸기 from '../../assets/imgs/groceries/딸기.png'
import 마늘 from '../../assets/imgs/groceries/마늘.png'
import 무 from '../../assets/imgs/groceries/무.png'
import 방울토마토 from '../../assets/imgs/groceries/방울토마토.png'
import 배 from '../../assets/imgs/groceries/배.png'
import 배추 from '../../assets/imgs/groceries/배추.png'
import 버섯 from '../../assets/imgs/groceries/버섯.png'
import 복숭아 from '../../assets/imgs/groceries/복숭아.png'
import 사과 from '../../assets/imgs/groceries/사과.png'
import 슬라이스치즈 from '../../assets/imgs/groceries/슬라이스 치즈.png'
import 애호박 from '../../assets/imgs/groceries/애호박.png'
import 양배추 from '../../assets/imgs/groceries/양배추.png'
import 양파 from '../../assets/imgs/groceries/양파.png'
import 토마토 from '../../assets/imgs/groceries/토마토.png'
import 포도 from '../../assets/imgs/groceries/포도.png'
import 파프리카 from '../../assets/imgs/groceries/파프리카.png'

import '../../styles/Landing.css';
import '../../styles/Common.css';

const imageMap = {
  '아보카도': 아보카도,
  '감자': 감자,
  '고추': 고추,
  '귤': 귤,
  '당근': 당근,
  '대파': 대파,
  '돼지고기': 돼지고기,
  '딸기': 딸기,
  '마늘': 마늘,
  '무': 무,
  '방울토마토': 방울토마토,
  '배': 배,
  '배추': 배추,
  '버섯': 버섯,
  '복숭아': 복숭아,
  '사과': 사과,
  '슬라이스치즈': 슬라이스치즈,
  '애호박': 애호박,
  '양배추': 양배추,
  '양파': 양파,
  '토마토': 토마토,
  '포도': 포도,
  '파프리카': 파프리카,
  '랜덤': 랜덤
}


function Modal({ bool, onClose, nameText, buttonText, item, detailbool, inputTime, unitTime, timeDifferenceOutput }) {
    
    const loginUser = useRecoilValue(loginUserState);

    const handleModalClose = () => {
        onClose();
    }

    const handleDelete = async() => {
        try {
            console.log(item.log.id);
            const response = await deleteGrocery(item.log.id, loginUser.accessToken);
            console.log('식재료 삭제 성공', response);
            handleModalClose();
          } catch (error) {
            alert("삭제에 실패했습니다.")
            console.log('식재료 삭제 실패', error);
      
          }
    }


    const [basicbool, setBasicBool] = useState(true);
    const [detailboolshow, setDetailBoolShow] = useState(false);
    const [dynamicText, setDynamicText] = useState("상세정보");


    const handleDetail = async() => {
        setBasicBool(!basicbool)
        setDetailBoolShow(!detailboolshow)
        setDynamicText("상세정보")
        console.log(basicbool, detailboolshow)
        
    }

    let selectedImage = imageMap[nameText];
    if (! selectedImage) {
        selectedImage = imageMap['랜덤'];
      }



    


    return (
        <>
            {bool && (
                <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='w-[380px] h-[300px] border-slate-500 border-4 rounded-xl bg-white pt-[4vh]'>
                        
                        <p className="flex justify-center items-center pb-[2vh]">{nameText}</p>
                        <div className="h-[3vh] pt-[4vh] flex justify-center items-center"><img src={selectedImage} alt="logo" className="max-w-12"/></div>
                        {basicbool &&(<div className="mt-[7vh]">
                        <div className="flex justify-center">
                            {timeDifferenceOutput}{unitTime} 경과
                        </div>
                        <div className="flex justify-center">
                            들어온 시간: {inputTime.replace("T", " ")}
                        </div>
                        <div className="flex justify-center">
                            종류: {item.log.category}
                        </div>                      
                        </div>)}
                        {detailboolshow &&(<div className="mt-[7vh]">
                        <div className="flex justify-center">
                            단백질: {item.protein}
                        </div>
                        <div className="flex justify-center">
                            설탕: {item.sugar}
                        </div>
                        <div className="flex justify-center">
                           탄수화물: {item.carbs}
                        </div>                      
                        </div>)}
                        <div className="flex justify-center items-center mt-[1vh]">
                        {detailbool && (<button onClick={handleDetail} className="hover:bg-slate-200 rounded-xl border-solid border-2 w-22 px-2 border-slate-200"> {dynamicText} </button>)}
                        <button onClick={handleDelete} className="hover:bg-slate-200 ml-32 rounded-xl border-solid border-2 w-12 border-slate-200">{buttonText}</button>
                        <button onClick={handleModalClose} className="rounded-xl border-solid border-2 w-12 border-slate-200 ml-4 hover:bg-slate-200">닫기</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;
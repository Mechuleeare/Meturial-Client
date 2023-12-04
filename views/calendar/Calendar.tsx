import {styled} from 'styled-components/native';
import {color} from '../../style/color';
import Txt from '../../components/Txt';
import React, {useEffect, useState} from 'react';
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import {Add, Arrow_down, Arrow_up} from '../../assets';
import Button from '../../components/Button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseUrl} from '../../utils';
import {Dot} from '../../components/Dot';

const RenderHeader = ({currentMonth, prevMonth, nextMonth}: any) => {
  return (
    <Header>
      <HeaderFlex>
        <Txt typography="LabelLarge">{format(currentMonth, 'yyyy')}년</Txt>
        <Txt typography="LabelLarge">{format(currentMonth, 'M')}월</Txt>
      </HeaderFlex>
      <HeaderFlex>
        <IconButton onPress={nextMonth}>
          <Arrow_up />
        </IconButton>
        <IconButton onPress={prevMonth}>
          <Arrow_down />
        </IconButton>
      </HeaderFlex>
    </Header>
  );
};

const RenderDays = () => {
  const days = [];
  const date = ['일', '월', '화', '수', '목', '금', '토'];
  for (let i = 0; i < 7; i++) {
    if (i === 0 || i === 6) {
      days.push(
        <Txt key={i} color={color.Green.Point} typography="LabelLarge">
          {date[i]}
        </Txt>,
      );
    } else {
      days.push(
        <Txt key={i} color={color.Gray[600]} typography="LabelLarge">
          {date[i]}
        </Txt>,
      );
    }
  }
  return <DaysFlex>{days}</DaysFlex>;
};

const RenderBody = ({currentMonth, onDateClick, todayDate, menuList}: any) => {
  //이번달 5주 구하는 변수
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let dotday = '';
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      dotday = format(day, 'yyyy-M-dd');
      const cloneday = day;
      days.push(
        <BodyTxtFlex
          key={i}
          onPress={() => onDateClick(cloneday)}
          style={{
            backgroundColor: isSameMonth(day, monthStart)
              ? isSameDay(day, todayDate)
                ? color.White
                : color.Gray[50]
              : color.Gray[50],
          }}>
          <Txt
            typography="LabelMedium"
            color={
              !isSameMonth(day, monthStart)
                ? color.Gray[400]
                : isSameDay(day, todayDate)
                ? color.Green[600]
                : color.Black
            }>
            {formattedDate}
          </Txt>
          <DotFun menuList={menuList} dotday={dotday} />
        </BodyTxtFlex>,
      );
      day = addDays(day, 1);
    }
    rows.push(<BodyFlex>{days}</BodyFlex>);
    days = [];
  }

  if (rows.length < 6) {
    //다음달 1주 구하기 위한 변수
    const NextMonthStart = startOfMonth(addMonths(currentMonth, 1));
    const NextmonthEnd = endOfMonth(NextMonthStart);
    const NextstartDate = startOfWeek(NextMonthStart);
    const NextendDate = endOfWeek(NextmonthEnd);

    const Nextrows = [];
    let Nextdays = [];
    let Nextday = NextstartDate;
    let NextformattedDate = '';

    while (Nextday <= NextendDate) {
      for (let i = 0; i < 7; i++) {
        NextformattedDate = format(Nextday, 'd');
        const Nextcloneday = Nextday;
        Nextdays.push(
          <BodyTxtFlex onPress={() => onDateClick(Nextcloneday)}>
            <Txt typography="LabelMedium" color={color.Gray[400]}>
              {NextformattedDate}
            </Txt>
          </BodyTxtFlex>,
        );
        Nextday = addDays(Nextday, 1);
      }
      Nextrows.push(<BodyFlex>{Nextdays}</BodyFlex>);
      Nextdays = [];
    }
    rows.push(Nextrows[1]);
  }

  return <Body>{rows}</Body>;
};

const DotFun = ({dotday, menuList}: any) => {
  const sortedData = new Array(3);
  for (const key in menuList) {
    if (key === dotday) {
      if (menuList[key]) {
        for (let i = 0; i < 3; i++) {
          if (menuList[key][i]) {
            if (menuList[key][i].menuType === 'BREAKFAST') {
              sortedData[0] = menuList[key][i];
            } else if (menuList[key][i].menuType === 'LUNCH') {
              sortedData[1] = menuList[key][i];
            } else if (menuList[key][i].menuType === 'DINNER') {
              sortedData[2] = menuList[key][i];
            }
          }
        }
      }
      return (
        <DotFlex>
          {sortedData[0] ? <Dot DotColor="BREAKFAST" /> : <Dot />}
          {sortedData[1] ? <Dot DotColor="LUNCH" /> : <Dot />}
          {sortedData[2] ? <Dot DotColor="DINNER" /> : <Dot />}
        </DotFlex>
      );
    }
  }
};

export const Calendar = ({navigation}: any) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [menuList, setMenuList] = useState([]);
  const todayDate = new Date();

  useEffect(() => {
    async function GetMenuList() {
      const Token = await AsyncStorage.getItem('AccessToken');
      try {
        const result = await axios.get(`${BaseUrl}/menu/list`, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
          params: {
            year: format(currentMonth, 'yyyy'),
            month: format(currentMonth, 'M'),
          },
        });
        setMenuList(result.data.menuMap);
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    GetMenuList();
  }, [currentMonth]);

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day: Date) => {
    console.log(day);
    navigation.navigate('MenuDetail', {date: day});
  };
  return (
    <Background>
      <CalendarBackground>
        <RenderHeader
          currentMonth={currentMonth}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
        />
        <RenderDays />
        <RenderBody
          currentMonth={currentMonth}
          todayDate={todayDate}
          onDateClick={onDateClick}
          menuList={menuList}
        />
      </CalendarBackground>
      <ButtonFlex>
        <Button
          status="silver"
          icon={<Add />}
          onPress={() => navigation.navigate('AddMenu')}>
          식단 추가하기
        </Button>
      </ButtonFlex>
    </Background>
  );
};

const Background = styled.ScrollView`
  width: 100%;
  height: 100%;
  background-color: ${color.White};
  padding: 24px 16px;
`;

const CalendarBackground = styled.View`
  width: 100%;
  height: 432px;
  background-color: ${color.Gray[50]};
  border-radius: 8px;
  padding: 8px;
`;

const Header = styled.View`
  width: 100%;
  height: 52px;
  background-color: ${color.White};
  padding: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderFlex = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const IconButton = styled.Pressable`
  align-items: center;
  justify-content: center;
  background-color: ${color.Gray[50]};
  width: 28px;
  height: 28px;
  border-radius: 8px;
`;

const DaysFlex = styled.View`
  width: 100%;
  height: 52px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

//전체 4~5줄
const Body = styled.View`
  width: 100%;
  height: 100%;
`;

//한줄 플렉스
const BodyFlex = styled.View`
  width: 100%;
  height: 52px;
  flex-direction: row;
`;

// 하나 감싸는 플렉스
const BodyTxtFlex = styled.Pressable`
  width: 14.3%;
  height: 100%;
  padding: 8px 0;
  align-items: center;
  border-radius: 8px;
`;

const ButtonFlex = styled.View`
  width: 140px;
  height: 48px;
  background-color: ${color.White};
  margin-top: 12px;
  margin-bottom: 108px;
`;

const DotFlex = styled.View`
  width: 28px;
  height: 8px;
  flex-direction: row;
  align-items: center;
  gap: 2px;
`;

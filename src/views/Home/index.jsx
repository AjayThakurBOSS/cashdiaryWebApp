// Packages:
import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getAllCashTracking } from "../../api/cashTracking";
import {
  addMileageTracking,
  getAllMileageTracking
} from "../../api/mileageTracking";
import { addRealEstate, getAllRealEstate } from "../../api/realEstate";
import {
  addDailyCashTransactions,
  getAllDailyCashTransactions
} from "../../api/dailyCashTransactions";
import { getAllUserSubscription } from "../../api/userSubscription";

// Imports:
import { Building2, Calendar, DollarSign, Minus, Podcast } from "lucide-react";

// Styles:
import { FLEX } from "../../styles/snippets";
import { fetchCashDiaryData } from "../../redux/actions/cashDiaryAction";
import { fetchLockerData } from "../../redux/actions/lockerAction";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorage";
import { idText } from "typescript";
import { fetchRealEstateData } from "../../redux/actions/realEstateAction";
import { fetchMilageTrackingData } from "../../redux/actions/milageTrackingAction";
import { fetchUserSubscriptionData } from "../../redux/actions/userSubscriptionAction";
import { fetchSecretPinData } from "../../redux/actions/secretPinAction";

// Functions:
const TrialModal = ({ name, days, hideTrialModal }) => (
  <TrialModalWrapper>
    <marquee>
      {" "}
      <span>
        Hi {name}, Thank you for using CashDiary App. Your free trial ends in{" "}
        {days} days.
      </span>{" "}
    </marquee>
    <Minus
      onClick={hideTrialModal}
      color="#D00000"
      style={{ cursor: "pointer" }}
    />
  </TrialModalWrapper>
);

const HomeCard = ({ icon, title, description, backgroundColor }) => (
  <HomeCardWrapper style={{ backgroundColor }}>
    <Title>
      {icon}
      {title}
    </Title>
    <Description>{description}</Description>
  </HomeCardWrapper>
);

const Home = () => {
  const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
  console.log("AuthToken", authToken);

  const dispatch = useDispatch();
  // State:
  const [daysLefts, setDaysLefts] = useState([]);

  const username = useSelector((state) => state.auth.username) ?? "user";
  const [showTrialModal, setShowTrialModal] = useState(true);
  const [homeCardValues, setHomeCardValues] = useState({
    cashTracking: 0,
    mileageTracking: 0,
    realEstate: "0+ Cr",
    dailyCash: 0
  });

  // Milage
  const allmilages = useSelector(
    (state) => state.allMilageTrackings.milagetrackings.data
  );
  const toalKms = () => {
    const totalkmss =
      allmilages &&
      allmilages.reduce((prev, curr) => prev + +curr.kiloMeters, 0);
    return totalkmss;
  };
  const totalDistance = toalKms();
  const reversestring0 = String(totalDistance).split("").reverse().join("");
  const chunks0 = reversestring0.match(/.{1,3}/g);
  const formatedDistance = chunks0.join(",").split("").reverse().join("");

  // RealEstate
  const AllRealEstateDatas = useSelector(
    (state) => state.AllRealStatesData.realEstate.data
  );
  const totalNetWorth = () => {
    const totalNworth =
      AllRealEstateDatas &&
      AllRealEstateDatas.reduce((prev, curr) => prev + +curr.netWorth, 0);
    return totalNworth;
  };
  const totalNetworts = totalNetWorth();
  const reversestring1 = String(totalNetworts).split("").reverse().join("");
  const chunks1 = reversestring1.match(/.{1,3}/g);
  const formattedNumber1 = chunks1.join(",").split("").reverse().join("");

  // User Subscription
  const AllUserSubscription = useSelector(
    (state) => state.userSubscriptionData.userSubscription.data
  );
  console.log(AllUserSubscription);

  const numberOfDaysLeft = useMemo(() => {
    const daysLeft =
      AllUserSubscription &&
      AllUserSubscription.map((eachDates) => {
        const { id, startDate, endDate } = eachDates;
        const EndDate = endDate.substring(0, 10);
        const currentDate = new Date();
        const date2 = new Date(EndDate);
        const NoOfdaysLeft = Math.ceil(
          (date2.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)
        );
        return { id, startDate, endDate, NoOfdaysLeft };
      });
    // console.log(daysLeft)
    // setDaysLefts({...daysLeft });
    // console.log( "State From Inside: ", daysLefts)
    return daysLeft;
  }, [AllUserSubscription]);

  const dateLeft = numberOfDaysLeft; // get the memoized result
  console.log(dateLeft); // log the array to the console

  useEffect(() => {
    dispatch(fetchRealEstateData());
    dispatch(fetchMilageTrackingData());
    dispatch(fetchUserSubscriptionData());
    dispatch(fetchSecretPinData());
  }, []);

  // Constants:
  const homeCards = [
    // {
    //   icon: <DollarSign size='1.25rem' />,
    //   title: 'Cash Tracking',
    //   description: `Balance: ${ homeCardValues.cashTracking }`,
    //   backgroundColor: '#405189'
    // },
    {
      icon: <Podcast size="1.25rem" />,
      title: "Mileage Tracking",
      description: `Total Distance:  ${formatedDistance} `,
      // description: `Total KMs: ${ homeCardValues.mileageTracking }`,
      backgroundColor: "#3DA5F4"
    },
    {
      icon: <Building2 size="1.25rem" />,
      title: "Real Estate",
      description: `Total Net Worth: $ ${formattedNumber1}`,
      backgroundColor: "#FDA006"
    }
    // {
    //   icon: <Calendar size='1.25rem' />,
    //   title: 'Daily Cash',
    //   description: `Balance: ${ homeCardValues.dailyCash }`,
    //   backgroundColor: '#F1536E'
    // }
  ];

  // Effects:
  useEffect(() => {
    (async () => {
      const newHomeCardValues = {
        ...homeCardValues
      };
      const { result: cashTrackingResult, payload: cashTrackingPayload } =
        await getAllCashTracking();
      if (cashTrackingResult) {
        newHomeCardValues.cashTracking =
          cashTrackingPayload.length > 0
            ? cashTrackingPayload.reduce((acc, cur) => {
                if (acc.amount) return acc.amount;
                return acc + cur.amount;
              })
            : 0;
      }
      const { result: mileageTrackingResult, payload: mileageTrackingPayload } =
        await getAllMileageTracking();
      if (mileageTrackingResult) {
        newHomeCardValues.mileageTracking =
          mileageTrackingPayload.length > 0
            ? mileageTrackingPayload.reduce((acc, cur) => {
                if (acc.kiloMeters) return acc.kiloMeters;
                return acc + parseFloat(cur.kiloMeters);
              })
            : 0;
      }
      const { result: realEstateResult, payload: realEstatePayload } =
        await getAllRealEstate();
      if (realEstateResult) {
        newHomeCardValues.realEstate =
          realEstatePayload.length > 0
            ? `${realEstatePayload.reduce((acc, cur) => {
                if (acc.netWorth) return acc.netWorth;
                return acc + parseFloat(cur.netWorth);
              })}+ Cr`
            : "0+ Cr";
      }
      const {
        result: dailyCashTransactionsResult,
        payload: dailyCashTransactionsPayload
      } = await getAllDailyCashTransactions();
      if (dailyCashTransactionsResult) {
        newHomeCardValues.dailyCash =
          dailyCashTransactionsPayload.length > 0
            ? dailyCashTransactionsPayload.reduce((acc, cur) => {
                if (acc.amount) return acc.amount;
                return acc + parseFloat(cur.amount);
              })
            : 0;
      }
      setHomeCardValues({
        ...homeCardValues,
        ...newHomeCardValues
      });
    })();
    addMileageTracking({
      name: "name",
      from: "user2",
      to: "user1",
      purpose: "purpose",
      kiloMeters: 12.0,
      dateOfDrive: new Date().toISOString()
    });

    addRealEstate({
      name: "name",
      purchasePrice: 10,
      yearOfPurchase: 2020,
      percentOwn: 10,
      url: "https://google.com",
      netWorth: 10
    });

    addDailyCashTransactions({
      description: "description",
      notes: "notes",
      amount: 100,
      transactionDate: new Date().toISOString(),
      dailyCashId: 12,
      dailyCash: {
        name: "name12"
      }
    });
  }, []);

  // Return:
  return (
    <Wrapper>
      {showTrialModal && (
        <TrialModal
          name={username}
          days={
            dateLeft &&
            dateLeft.map((subscription) => {
              return (
                <span
                  key={subscription.id}
                  style={{ margin: "0 3px", padding: "0" }}
                >
                  {subscription.NoOfdaysLeft}
                </span>
              );
            })
          }
          hideTrialModal={() => setShowTrialModal(false)}
        />
      )}
      <HomeCards>
        {homeCards.map((homeCard, index) => (
          <HomeCard key={`homecard-${index}`} {...homeCard} />
        ))}
      </HomeCards>
    </Wrapper>
  );
};

// Exports:
export default Home;

const Wrapper = styled.div`
  position: absolute;
  left: 20vw;
  top: 3.75rem;
  width: 78.71vw;
  height: calc(100vh - 3.75rem);
  padding: 1.5rem;

  @media screen and (min-width: 768px) and (max-width: 992px) {
    font-size: 1rem;
    font-weight: 400;
    width: 100vw;
    left: 0;
  }

  @media screen and (min-width: 576px) and (max-width: 768px) {
    font-size: 14px;
    font-weight: 400;
    width: 100vw;
    left: 0;
  }
  @media screen and (min-width: 200px) and (max-width: 576px) {
    font-size: 14px;
    font-weight: 400;
    width: 100vw;
    left: 0;
  }
`;

const TrialModalWrapper = styled.div`
  ${FLEX}
  justify-content: space-between;
  min-height: 2.5rem;
  height: auto;
  padding: 0.75rem;
  font-weight: 500;
  background-color: #ffc5c5;
`;

const HomeCards = styled.div`
  ${FLEX}
  justify-content: flex-start;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const HomeCardWrapper = styled.div`
  ${FLEX}
  flex-direction: column;
  gap: 0.25rem;
  width: 13rem;
  height: 5.25rem;
  padding: 1rem;
  background-color: grey;
  border-radius: 0.5rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  height: 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
`;

const Description = styled.div`
  width: 100%;
  height: 2rem;
  font-size: 0.8rem;
  font-weight: 400;
  color: #e6e6e6;
`;

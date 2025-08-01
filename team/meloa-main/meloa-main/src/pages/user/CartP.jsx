import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";

const CartP = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [scrollNeeded, setScrollNeeded] = useState({});
  const navigate = useNavigate();

  const isAllSelected =
    cartItems.length > 0 && selectedItems.length === cartItems.length;

  const toggleSelectAll = () => {
    setSelectedItems(
      isAllSelected ? [] : cartItems.map((item) => item.id)
    );
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // 백엔드 연동시 이 주석 풀기
        // const res = await fetch("http://localhost:5000/api/cart", {
        //   credentials: "include",
        // });

        // if (!res.ok) throw new Error("서버 응답 실패");

        // const data = await res.json();

        // const formatted = data.map((item) => ({
        //   id: item._id,
        //   title: item.title,
        //   artist: item.artist,
        //   image: item.image,
        //   price: item.price,
        // }));

        // setCartItems(formatted);
        // setSelectedItems(formatted.map((item) => item.id));

        throw new Error("강제 에러로 임시 데이터 테스트"); // 강제로 catch로 넘어가게 함
      } catch (err) {
        console.warn("❌ 서버 연결 실패로 임시 데이터를 사용합니다.");

        // 임시 데이터 (개발용)
        const mockData = [
          {
            id: 1,
            title: "GOLDEN",
            artist: "헌트릭스",
            image: "https://placehold.co/60x60",
            price: 700,
          },
          {
            id: 2,
            title: "SODA POP",
            artist: "사자보이즈",
            image: "https://placehold.co/60x60",
            price: 700,
          },
          {
            id: 3,
            title: "일단 대충 엄청나게 긴 제목을 써본다",
            artist: "엄청나게 긴 아티스트 이름도 써본다",
            image: "https://placehold.co/60x60",
            price: 700,
          },
        ];
        setCartItems(mockData);
        setSelectedItems(mockData.map((item) => item.id));
      }
    };

    fetchCartItems();
  }, []);



  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  const deleteItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    setScrollNeeded((prev) => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  };

  const handleDeleteSelected = () => {
    setCartItems((prev) =>
      prev.filter((item) => !selectedItems.includes(item.id))
    );
    setSelectedItems([]);
    setScrollNeeded({});
  };

  const handlePayment = () => {
    const selectedCartItems = cartItems.filter(item =>
      selectedItems.includes(item.id)
    );
    navigate("/pay", { state: { items: selectedCartItems } });
  };

  const totalPrice = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0);

  const textRefs = useRef({});

  useEffect(() => {
    const checkOverflow = () => {
      cartItems.forEach(({ id }) => {
        const el = textRefs.current[id];
        if (el) {
          const isOverflowing = el.scrollWidth > el.clientWidth;
          setScrollNeeded((prev) => ({ ...prev, [id]: isOverflowing }));
        }
      });
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [cartItems]);

  return (
    <Container>
      <Notice>
        구매한 MP3 음원은 Meloa &gt; 마이페이지 &gt; 구매한 콘텐츠에서 확인하실 수 있습니다.
        개별 구매한 MP3는 최초 다운로드일로부터 1년 이내 재다운로드가 가능합니다.
        단, 일부 음원은 저작권자의 요청에 따라 재다운로드가 제한될 수 있습니다.
        MP3 다운로드 상품은 디지털 콘텐츠 특성상 청약철회(환불)가 불가합니다.
        MP3 음원은 기본적으로 320kbps 음질로 제공되며,
        해당 음질이 없는 경우에는 128kbps 또는 192kbps로 제공될 수 있습니다.
        음질은 별도로 선택하실 수 없습니다.
      </Notice>
      <Divider />

      {cartItems.length === 0 ? (
        <EmptyMessage>음원을 담아주세요</EmptyMessage>
      ) : (
        <>
          <ListHeader>
            <CheckboxWrapper>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={toggleSelectAll}
              />
            </CheckboxWrapper>
            <HeaderText>노래 제목 · 아티스트</HeaderText>
            <HeaderText>가격</HeaderText>
            <HeaderDeleteButton onClick={handleDeleteSelected}>
              선택삭제
            </HeaderDeleteButton>
          </ListHeader>

          {cartItems.map((item) => {
            const isSelected = selectedItems.includes(item.id);
            const needScroll = scrollNeeded[item.id];
            const scrollWidth = textRefs.current[item.id]?.scrollWidth || 0;

            return (
              <CartItem key={item.id}>
                <CheckboxContainer>
                  <StyledCheckbox
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelect(item.id)}
                  />
                </CheckboxContainer>
                <AlbumImage src={item.image} alt="album" />
                <TextGroup>
                  <ScrollingTextWrapper
                    ref={(el) => (textRefs.current[item.id] = el)}
                    $scroll={needScroll}
                    $scrollWidth={scrollWidth}
                    title={`${item.title} · ${item.artist}`}
                  >
                    {item.title}
                  </ScrollingTextWrapper>
                  <Art>{item.artist}</Art>
                </TextGroup>
                <PriceContainer>
                  <Price>{item.price.toLocaleString()}원</Price>
                </PriceContainer>
                <DeleteButton onClick={() => deleteItem(item.id)}>✕</DeleteButton>
              </CartItem>
            );
          })}

          <TotalSection>
            <TotalText>총 {totalPrice.toLocaleString()}원</TotalText>
          </TotalSection>
          <PayButton
            disabled={selectedItems.length === 0}
            onClick={handlePayment}
          >
            결제하기
          </PayButton>
        </>
      )}
    </Container>
  );
};

export default CartP;

// ⬇ styled-components

const scrollAnim = (scrollWidth) => keyframes`
  0%, 25% { transform: translateX(0); }
  75%, 100% { transform: translateX(-${scrollWidth + 20}px); }
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
  background: white;
  min-height: 100vh;
`;

const Notice = styled.div`
  font-size: 12px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 16px;
`;

const Divider = styled.div`
  height: 1px;
  background: #e0e0e0;
  margin-top: 16px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  font-size: 16px;
  color: #999;
  margin: 60px 0;
`;

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #e0e0e0;
`;

const CheckboxWrapper = styled.label`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #ff2c68;
  }
`;

const HeaderText = styled.div`
  font-size: 14px;
  color: #666;

  &:first-child {
    // flex: 1;
    margin-left: 65px;
  }

  &:nth-child(2) {
    width: 50%;
  }
`;

const HeaderDeleteButton = styled.button`
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 12px;
  color: #666;
  cursor: pointer;
  margin-left: 8px;

  &:hover {
    background: #f5f5f5;
  }
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  gap: 8px;
`;

const CheckboxContainer = styled.div`
  width: 20px;
  display: flex;
  justify-content: center;
`;

const StyledCheckbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #ff2c68;
`;

const AlbumImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 4px;
  object-fit: cover;
  margin-left: 7px;
`;

const TextGroup = styled.div`
  flex: 1;
  min-width: 0;
  margin-left: 8px;
`;

const ScrollingTextWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
`;

const Art = styled.div`
  font-size: 12px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PriceContainer = styled.div`
  width: 60px;
  text-align: center;
`;

const Price = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ccc;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;

  &:hover {
    color: #ff2c68;
  }
`;

const TotalSection = styled.div`
  text-align: right;
  padding: 20px 0;
  margin-top: 16px;
`;

const TotalText = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #333;
`;

const PayButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #ff2c68;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 16px;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

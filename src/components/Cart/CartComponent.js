import React, { useState } from "react";
import CartEmpty from "./CartEmpty";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "./../../actions/index";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import transferPrice from "../../helper/TransferPrice";
function CartItemComponent(props) {
    const { data } = props;
    const dispatch = useDispatch();
    return (
        <div class="cart__item">
            <div class="cart__item-info">
                <img src={data.image} alt="" class="cart__item-img" />
                <div class="cart__item-info-list">
                    <span class="cart__item-name">{data.title}</span>
                    <span class="cart__item-name-qr">{data.id}</span>
                </div>
            </div>
            <div class="cart__item-detail">
                <div>
                    <button
                        className="cart__item-remove"
                        onClick={() =>
                            dispatch(actions.changeQuantityCart(-1, data))
                        }
                    >
                        <i
                            class={`${
                                data.soluong === 1
                                    ? "far fa-trash-alt"
                                    : "fas fa-minus"
                            }`}
                        ></i>
                    </button>
                    <span class="cart__item-quantity">{data.soluong}</span>
                    <button
                        class="cart__item-add"
                        onClick={() =>
                            dispatch(actions.changeQuantityCart(1, data))
                        }
                    >
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <div class="cart__item-price">
                <div class="cart__item-price-current">
                    {transferPrice(data.newprice * data.soluong)}??
                </div>
                <div class="cart__item-price-old">
                    {transferPrice(data.oldprice * data.soluong)}??
                </div>
            </div>
        </div>
    );
}

function CartComponent(props) {
    const ListCart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const history = useHistory();
    function renderTotalMoney() {
        var total = 0;
        if (ListCart.length > 0) {
            ListCart.forEach((item) => {
                total += item.soluong * item.newprice;
            });
        }
        return total;
    }
    function handleDeleteAllItem() {
        if (ListCart && ListCart.length > 0) {
            confirmAlert({
                title: "C???nh b??o",
                message: "B???n c?? ch???n mu???n x??a t???t c??? gi??? h??ng",
                buttons: [
                    {
                        label: "Yes",
                        onClick: () => {
                            dispatch(actions.deleteAllCart());
                            toast.error("X??a t???t c??? s???n ph???m th??nh c??ng");
                        },
                    },
                ],
            });
        }
    }
    function renderListCart() {
        var content = [];
        if (ListCart && ListCart.length > 0)
            content = ListCart.map((item, stt) => (
                <CartItemComponent data={item} key={stt} />
            ));
        else content = <CartEmpty></CartEmpty>;
        return content;
    }
    function checkQuantity(ListCart) {
        var temp = [];
        if (ListCart && ListCart.length > 0) {
            temp = ListCart.filter(
                (item, stt) => item.quantity - item.soluong < 0
            );
        }
        return temp;
    }
    function onClickCheckOut() {
        if (!user) {
            toast.error("Vui l??ng ????ng nh???p ????? thanh to??n");
            return;
        } else if (checkQuantity(ListCart).length > 0) {
            var ProductNotQuantiy = checkQuantity(ListCart);
            ProductNotQuantiy.forEach((item) => {
                if (item.quantity < 1) {
                    toast.error(
                        `S???n ph???m ${item.title} ???? h???t h??ng vui l??ng quay l???i sau`
                    );
                } else {
                    toast.error(
                        `S???n ph???m ${item.title} ch??? c??n l???i ${item.quantity} s???n ph???m vui l??ng ch???n l???i s??? l?????ng`
                    );
                }
            });
            return;
        }
        history.push("/checkout");
    }
    return (
        <div>
            <div class="grid__row">
                <div class="grid__column-8">
                    <div class="cart__info">
                        <span class="cart__info-quantity">
                            Gi??? h??ng c?? {ListCart && ListCart.length} s???n ph???m
                        </span>
                        <span
                            class={`${
                                !ListCart || ListCart.length < 1
                                    ? "cart__info-delete--disable"
                                    : "cart__info-delete"
                            }`}
                            onClick={handleDeleteAllItem}
                        >
                            X??a t???t c???
                        </span>
                    </div>
                </div>
            </div>
            <div class="grid__row grid__row-1">
                <div class="grid__column-8">{renderListCart()}</div>
                <div class="grid__column-4">
                    <div class="cart__cupon">
                        <span class="cart__cupon-qr">
                            M?? gi???m gi?? / Phi???u mua h??ng
                        </span>
                        <div class="cart__cupon-type">
                            <input
                                type="text"
                                class="cart__cupon-type-input"
                                placeholder="Nh???p m?? c???a b???n"
                            />
                            <button class="cart__cupon-type-btn">
                                ??p d???ng ngay
                            </button>
                        </div>
                    </div>
                    <div class="cart-pay">
                        <span class="cart-pay-text">
                            Thanh to??n(???? bao g???m VAT)
                        </span>
                        <div class="cart-pay-sum">
                            <span class="cart-pay-sum-a">T???m t??nh</span>
                            <span class="cart-pay-sum-money">
                                {transferPrice(renderTotalMoney())}??
                            </span>
                        </div>
                        <div class="cart-pay-transport">
                            <span class="cart-pay-transport-a">
                                Ph?? v???n chuy???n
                            </span>
                            <span class="cart-pay-transport-money">
                                30.000 ??
                            </span>
                        </div>
                        <div class="cart-pay-sale">
                            <span class="cart-pay-sale-a">Khuy???n m??i</span>
                            <span class="cart-pay-sale-money">0 ??</span>
                        </div>
                        <div class="cart-pay-check">
                            <span class="cart-pay-check-a">Th??nh ti???n</span>
                            <span class="cart-pay-check-money">
                                {transferPrice(renderTotalMoney() + 30000)}
                            </span>
                        </div>
                        <button
                            class="cart-pay-btn-pay btn-disable"
                            onClick={onClickCheckOut}
                        >
                            TI???N H??NH THANH TO??N
                            {!user && (
                                <div class="cart-pay-btn-pay__title">
                                    B???n c???n ????ng nh???p ????? ti???p t???c
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartComponent;

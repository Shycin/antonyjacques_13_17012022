import './index.css'

function ItemTransaction(props) {
    const { title, account, amount, description } = props
    return (
        <section className="account">
            <div className="account-content-wrapper">
            <h3 className="account-title">{title} (x{account})</h3>
            <p className="account-amount">${amount}</p>
            <p className="account-amount-description">{description}</p>
            </div>
            <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
            </div>
        </section>
    )
}
export default ItemTransaction
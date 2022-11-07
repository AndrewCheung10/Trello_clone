import moment from "moment";

const DueDateCard = ({ dueDate, complete }) => {
    const expired = new Date(dueDate) - new Date();

    return (
        <div
            style={{
                display: "flex",
                borderRadius: "3px",
                backgroundColor:
                    !complete && expired < 0 ? "#EC8488" : "#7bc86c",
                padding: 3,
                fontSize: 12,
                color: "white",
            }}
            // data-testid="card"
            aria-label="Card"
        >
            {moment(dueDate).format("ll")}
        </div>
    );
};

export default DueDateCard;

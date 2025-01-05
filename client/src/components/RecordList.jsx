import PropTypes from 'prop-types';

function RecordList({ records }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Records</h2>
      <div className="space-y-4">
        {records.map((record) => (
          <div key={record._id} className="p-4 bg-white rounded-md shadow-md">
            <h3 className="text-lg font-medium">{record.name}</h3>
            <p>{record.email}</p>
            <p>{record.phone}</p>
            <p>{record.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// PropTypes to validate the structure of the passed records prop
RecordList.propTypes = {
  records: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,  // Assuming _id is a string and required
      name: PropTypes.string.isRequired, // Assuming name is a string and required
      email: PropTypes.string.isRequired, // Assuming email is a string and required
      phone: PropTypes.string.isRequired, // Assuming phone is a string and required
      message: PropTypes.string.isRequired, // Assuming message is a string and required
    })
  ).isRequired,
};

export default RecordList;

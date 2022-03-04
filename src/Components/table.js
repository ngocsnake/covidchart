import { useState, useEffect } from 'react';
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import '../App.css'


function Table({ props }) {
    function Header() {
        let Icon;
        if (type.desc) {
            Icon = <FaSortDown></FaSortDown>;
        } else {
            Icon = <FaSortUp></FaSortUp>;
        }
        return (
            <div className="header-table">
                <div
                    onClick={() => {
                        setType({ column: 'name', desc: !type.desc })
                    }}
                    className="provincet">Tỉnh/Thành phố
                    {(type.column !== 'name' && <FaSort></FaSort>)}
                </div>
                <div
                    onClick={() => {
                        setType({ column: 'cases', desc: !type.desc })
                    }}
                    className="casest">Nhiễm
                    {type.column !== 'cases' && <FaSort></FaSort>}
                </div>
                <div
                    onClick={() => {
                        setType({ column: 'casesToday', desc: !type.desc })
                    }}
                    className="todaycasest">Hôm nay
                    {type.column !== 'casesToday' && <FaSort></FaSort>}
                </div>
                <div
                    onClick={() => {
                        setType({ column: 'death', desc: !type.desc })
                    }}
                    className="deatht">Tử vong
                    {type.column !== 'death' && <FaSort></FaSort>}
                </div>
            </div>
        )
    }

    const [table, setTable] = useState([]);
    const [type, setType] = useState({ column: 'cases', desc: true });

    useEffect(() => {
        fetch('https://static.pipezero.com/covid/data.json')
            .then(response => response.json())
            .then(data => {
                const table = data.locations;
                if (type.column === 'name') {
                    if (type.desc) {
                        table.sort((a, b) => {
                            return a[type.column].localeCompare(b[type.column]);
                        });
                    } else {
                        table.sort((a, b) => {
                            return b[type.column].localeCompare(a[type.column]);
                        });
                    }
                } else {
                    if (type.desc) {
                        table.sort((a, b) => {
                            return b[type.column] - a[type.column];
                        });
                    } else {
                        table.sort((a, b) => {
                            return a[type.column] - b[type.column];
                        });
                    }
                }
                setTable(table);
            });
    }, [type]);

    return (
        <div className="table" style={{ width: props.width || 'auto',  height: props.height || 'auto'}}>
            <Header></Header>
            <div className="body-table" style={{ boxSizing: 'border-box' }}>
                {table.map(location => (
                    <div className="row-info" key={location.name}>
                        <div className="provincet">{location.name}</div>
                        <div className="casest">{new Intl.NumberFormat().format(location.cases)}</div>
                        <div className="todaycasest">+{new Intl.NumberFormat().format(location.casesToday)}</div>
                        <div className="deatht">{new Intl.NumberFormat().format(location.death)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Table;

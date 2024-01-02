import datetime

def calculate_work_experience(timeframes):
    total_years = 0
    total_months = 0
    total_days = 0

    merged_timeframes = merge_overlapping_timeframes(timeframes)

    for timeframe in merged_timeframes:
        years, months, days = calculate_duration(timeframe)
        total_years += years
        total_months += months
        total_days += days

    # Simplify the total duration
    total_years += total_months // 12
    total_months %= 12

    return total_years, total_months, total_days

def merge_overlapping_timeframes(timeframes):
    merged = []

    # Sort the timeframes based on the start date
    sorted_timeframes = sorted(timeframes, key=lambda x: x[0])

    current_start, current_end = sorted_timeframes[0]

    for start, end in sorted_timeframes[1:]:
        if start <= current_end:
            # Merge overlapping timeframes
            current_end = max(current_end, end)
        else:
            # Add the merged timeframe and update current_start, current_end
            merged.append((current_start, current_end))
            current_start, current_end = start, end

    # Add the last merged timeframe
    merged.append((current_start, current_end))

    return merged

def calculate_duration(timeframe):
    start_date = parse_date(timeframe[0])
    end_date = parse_date(timeframe[1])

    delta = end_date - start_date

    years = delta.days // 365
    months = (delta.days % 365) // 30
    days = delta.days % 30

    return years, months, days

def parse_date(date_str):
    # Assuming the date format is DD/MM/YYYY
    day, month, year = map(int, date_str.split('/'))
    return datetime.datetime(year, month, day)

# Example usage:
timeframes = [
    ("01/01/2558", "31/12/2560"),
    ("01/01/2555", "31/12/2555"),
    ("01/12/2559", "31/12/2559"),
    ("01/06/2556", "31/12/2556"),
    ("01/06/2557", "31/05/2558")
]

total_experience = calculate_work_experience(timeframes)
print("Total Work Experience:", total_experience)

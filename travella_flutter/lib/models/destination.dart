class Amenity {
  final String id;
  final String name;
  final String icon;

  const Amenity({
    required this.id,
    required this.name,
    required this.icon,
  });

  factory Amenity.fromJson(Map<String, dynamic> json) {
    return Amenity(
      id: json['id'] as String,
      name: json['name'] as String,
      icon: json['icon'] as String,
    );
  }
}

class Host {
  final String name;
  final String role;
  final String avatar;
  final String responseRate;
  final String responseTime;

  const Host({
    required this.name,
    required this.role,
    required this.avatar,
    required this.responseRate,
    required this.responseTime,
  });

  factory Host.fromJson(Map<String, dynamic> json) {
    return Host(
      name: json['name'] as String,
      role: json['role'] as String,
      avatar: json['avatar'] as String,
      responseRate: json['responseRate'] as String,
      responseTime: json['responseTime'] as String,
    );
  }
}

class Specs {
  final int guests;
  final int bedrooms;
  final int beds;
  final int baths;

  const Specs({
    required this.guests,
    required this.bedrooms,
    required this.beds,
    required this.baths,
  });

  factory Specs.fromJson(Map<String, dynamic> json) {
    return Specs(
      guests: json['guests'] as int,
      bedrooms: json['bedrooms'] as int,
      beds: json['beds'] as int,
      baths: json['baths'] as int,
    );
  }
}

class Review {
  final String id;
  final String author;
  final String avatar;
  final double rating;
  final String date;
  final String comment;

  const Review({
    required this.id,
    required this.author,
    required this.avatar,
    required this.rating,
    required this.date,
    required this.comment,
  });

  factory Review.fromJson(Map<String, dynamic> json) {
    return Review(
      id: json['id'] as String,
      author: json['author'] as String,
      avatar: json['avatar'] as String,
      rating: (json['rating'] as num).toDouble(),
      date: json['date'] as String,
      comment: json['comment'] as String,
    );
  }
}

class Destination {
  final String id;
  final String title;
  final String location;
  final String country;
  final String category;
  final bool isFeatured;
  final bool isPopular;
  final bool isTrending;
  final double rating;
  final int reviewsCount;
  final int price;
  final int? discountPrice;
  final String imageUrl;
  final List<String> gallery;
  final String description;
  final List<Amenity> amenities;
  final Host host;
  final Specs specs;
  final List<Review> reviews;

  const Destination({
    required this.id,
    required this.title,
    required this.location,
    required this.country,
    required this.category,
    this.isFeatured = false,
    this.isPopular = false,
    this.isTrending = false,
    required this.rating,
    required this.reviewsCount,
    required this.price,
    this.discountPrice,
    required this.imageUrl,
    required this.gallery,
    required this.description,
    required this.amenities,
    required this.host,
    required this.specs,
    required this.reviews,
  });

  int get effectivePrice => discountPrice ?? price;
}
